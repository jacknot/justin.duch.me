---
title: Kubernetes Is Not The Post Apocalyptic Hellscape I Was Told It Would Be
thumbnail: kubernetes-thumb.png
---

One cold winter night, I was looking at the CPU and bandwidth graphs DigitalOcean gives for the VPS' I rent from them. Suddenly, I saw a huge spike lasting about 10 minutes. And by huge, I mean kinda small (but not normal, I don't get a lot of traffic on this blog). It was about the same as I get from pushing a new deployment. The blog was completely unharmed and still running fine, but I wanted to see what was doing it.

A quick look at the Nginx logs, I found hundreds of requests from ~20-50 IP addresses. Checking those IP addresses showed that they came from other servers (and most of them were also TOR nodes). So I didn't accidentally get famous, and instead I was a witness to one of the most pathetic DDoS attempts I've ever seen.

But after that, I found myself with a strange urge to learn Kubernetes. To do so, I bought the book "[Kubernetes in Action](https://www.manning.com/books/kubernetes-in-action-second-edition)", which isn't actually finished yet. But as it turns out, I didn't really need all of it yet because after reading the third chapter, I decided it was a good idea to move this blog onto Kubernetes.

Now, is moving such a small application onto an incredibly complicated environment allowed by the laws of physics? Yes, it is technically possible, you are seeing proof of it right now. But is it allowed by the laws of human decency? Probably not. So then why am I doing it? That's a very good question.

When making a Kubernetes cluster most people go for a managed service, such as Google Kubernetes Engine (GKE), Amazon Elastic Kubernetes Service (EKS), Azure Kubernetes Service (AKS), or even DigitalOcean's Kubernetes product. There's a big problem for me here however: I don't like Google, Amazon, or Microsoft. And I've also been slowly moving my hosting away from DigitalOcean.(^1)

(^1): Nothing wrong with them, I just prefer my new provider.

So this just left me to manage my own cluster. The section for deploying a multi-node cluster from scratch in the book starts off like this:

> Until you get a deeper understanding of Kubernetes, I strongly recommend that you don’t try to install a multi-node cluster from scratch. If you are an experienced systems administrator, you may be able to do it without much pain and suffering, but most people may want to try one of the methods described in the previous sections first. Proper management of Kubernetes clusters is incredibly difficult. The installation alone is a task not to be underestimated.

Encouraging words right here.

I wouldn't call myself an "experienced systems administrator", but I write JavaScript for living so I encounter pain and suffering on a daily basis, how bad could this be?

Today, I'm going to talk you through how I setup a multi-node Kubernetes cluster to host this very website. To make life easier we're going to use [MicroK8s](https://microk8s.io) instead of a bare metal Kubernetes, but all of this should still work on a normal Kubernetes deployment.

## Provision Servers

I'm renting my VPS' from Hetzner now, so these are the steps to do it for them. You can probably do the same from whoever you're hosting from (the steps are going to be a bit different), otherwise if you can't find a way to do the same things, your provider isn't very good and you should probably change.

Here's what you're going to need:

- A [Hetzner Cloud](https://www.hetzner.com/cloud) account.
- A Hetzner Cloud project for your Kubernetes cluster.
- A configured SSH key for your Hetzner Cloud project.
- An API token for your Hetzner Cloud project.
- A local [hcloud](https://github.com/hetznercloud/cli) CLI install.

You will also need to know basic [Kubernetes concepts](https://kubernetes.io/docs/concepts/) because I'm not going to explain them. There's actually quite a lot of things you need to know, so go read the book first or something. And because we are using MicroK8s, this was done on Ubuntu 20.04 but previous versions of Ubuntu should work too.

Assuming you got hcloud CLI installed with a context created for your project, we're going to first create the network and subnet. In the example below, I'm defining the network to have the IP range 10.44.0.0/16. The subnet is in the network zone eu-central with a definition of 10.44.0.0/24.

```bash
$ hcloud network create --name <network_id> --ip-range 10.44.0.0/16
$ hcloud network add-subnet <network_id> --network-zone eu-central --type server --ip-range 10.44.0.0/24
```

Au fait, remember to replace the variables in `<>`. So for this you could call `<network_id>` some thing like: `network-0`.

Next is creating the servers, we going to make three of them: 1 master and 2 nodes.

```bash
$ hcloud server create --type cx11 --name master-0 --image ubuntu-20.04 --ssh-key <ssh_key_id> --network <network_id>
$ hcloud server create --type cx11 --name node-0 --image ubuntu-20.04 --ssh-key <ssh_key_id> --network <network_id>
$ hcloud server create --type cx11 --name node-1 --image ubuntu-20.04 --ssh-key <ssh_key_id> --network <network_id>
```

Make sure to note down the IP addresses for each server when they're created.

After we have the servers, we will log into each one, apply updates and install MicroK8s. SSH to the IP address of the server as root, eg:

```bash
$ ssh root@<master-0_ip>
```

And run the following:

```bash
root@master-0:~$ apt update && apt -y upgrade
root@master-0:~$ snap install microk8s --classic
root@master-0:~$ microk8s.enable dns storage ingress
```

Do this for `node-0` and `node-1`.

## Create The Cluster

Now that we have installed MicroK8s, we create a cluster for our three machines using the `microk8s add-node` and `microk8s join` commands. SSH onto master-0 and run the following:

```bash
root@master-0:~$ microk8s add-node
Join node with: microk8s join 95.216.140.255:25000/1e94a7b6088c046dee9c8c6cdb04e751

If the node you are adding is not reachable through the default interface you can use one of the following:
 microk8s join 95.216.140.255:25000/1e94a7b6088c046dee9c8c6cdb04e751
 microk8s join 10.1.38.0:25000/1e94a7b6088c046dee9c8c6cdb04e751
```

Copy the `microk8s join` command and run it on one of the nodes. In this case we SSH into node-0 and run:

```bash
root@node-0:~$ microk8s join 95.216.140.255:25000/1e94a7b6088c046dee9c8c6cdb04e751
```

Do the same process for node-1 (you have to run `microk8s add-node` on master-0 again).

You might have noticed that I used the external IP for the node `95.216.140.255` instead of the internal one `10.1.38.0` which we made from our network in the first step. Why didn't I use the internal one you ask?

It's cus I'm dumb and I forgot I made it. You should probably use the internal IP instead.

Anyway, to make sure the nodes are joined, use this command:

```bash
root@master-0:~$ kubectl get nodes
NAME             STATUS   ROLES    AGE   VERSION
<node-1_ip>      Ready    <none>   1h    v1.18.4-1+6f17be3f1fd54a
<node-0_ip>      Ready    <none>   1h    v1.18.4-1+6f17be3f1fd54a
master-0         Ready    <none>   1h    v1.18.4-1+6f17be3f1fd54a
```

## Create A Docker Build

At this point I remembered that I don't have a Docker build for this blog.

So I made one.

I'm not going to explain how to do this. You should know how to do this. Who doesn't know Docker in this day and age?

## Deploy The Application

First, we will need to make a deployment. Here is mine:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: blog-deployment
  labels:
    app: blog
spec:
  replicas: 3
  selector:
    matchLabels:
      app: blog
  template:
    metadata:
      labels:
        app: blog
    spec:
      containers:
      - name: blog
        image: beanpupper/blog:latest
        ports:
        - containerPort: 3000

---

apiVersion: v1
kind: Service
metadata:
  name: blog-svc
  labels:
    app: blog
spec:
  ports:
  - port: 80
    targetPort: 3000
    protocol: TCP
    name: http
  selector:
    app: blog
```

I've called this `blog.yaml`. Now we create the deployment and service with:

```bash
root@master-0:~$ microk8s kubectl apply -f blog.yaml
```

Because we are not using a managed cluster, we don't get load balancing and proxy forwarding by default. Instead we will setup something called [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/#ingress-class). Make another file called `ingress.yaml`:

```yaml
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: ingress
spec:
  backend:
    serviceName: blog-svc
    servicePort: 80
```

Apply it as well:

```bash
root@master-0:~$ microk8s kubectl apply -f ingress.yaml
```

That's all, go to the IP of master-0 in the browser and you should see it.

## Setting Up TLS

Now we need to set up SSL certs. I've always just used Lets Encrypt. Make sure your DNS A record is pointing to master-0.

In master-0, enable Helm for MicroK8s and initalise it:

```bash
root@master-0:~$ microk8s enable helm
root@master-0:~$ microk8s helm init
```

Create the namespace for cert-manager:

```bash
root@master-0:~$ microk8s kubectl create namespace cert-manager
```

Add the Jetstack Helm repository and update cache:

```bash
root@master-0:~$ microk8s helm repo add jetstack https://charts.jetstack.io
root@master-0:~$ microk8s helm update
```

Install the `CustomResourceDefinition` resources using kubectl:

```bash
root@master-0:~$ microk8s kubectl apply --validate=false -f https://github.com/jetstack/cert-manager/releases/download/v0.15.1/cert-manager.crds.yaml
```

Install the `cert-manager` Helm chart:

```bash
root@master-0:~$ microk8s helm install \
  --name cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --version v0.15.1
```

Create a cluster issuer `cluster-issuer.yaml`, and remember to update the email address with a yours instead.

```yaml
apiVersion: cert-manager.io/v1alpha2
kind: ClusterIssuer
metadata:
  name: letsencrypt
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: <email_address>
    privateKeySecretRef:
      name: letsencrypt
    solvers:
    - http01:
        ingress:
          class: nginx
```

And apply it:

```bash
root@master-0:~$ microk8s kubectl apply -f cert-issuer.yaml
```

Now we need to update `ingress.yaml`:

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: ingress
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt
spec:
  tls:
  - hosts:
    - blog.justinduch.com
    secretName: tls-secret
  rules:
  - host: blog.justinduch.com
    http:
      paths:
      - backend:
          serviceName: blog-svc
          servicePort: 80
```

Apply it again:

```bash
root@master-0:~$ microk8s kubectl apply -f ingress.yaml
```

To verify that the certificate was created successfully, use:

```bash
root@master-0:~$ microk8s kubectl get certificate
NAME         READY   SECRET       AGE
tls-secret   True    tls-secret   11m
```

And verify `READY` is True, which may take several minutes.

With that, we are done. Normally I'd say to go onto the site to check if it worked, but if already you're here then it obviously did 😄.

This was very straightforward and to be honest, I would not have called doing this to have been filled with pain and suffering. It only took a weekend to do, one to read up on all the concepts and another to implement them.

I don't know how much of it was because of MicroK8s, but I've looked at how to do it normally and the biggest difference was just in adding the nodes to the cluster. Although, I can definitely see how this could become too much if the scope was larger.

Even though the servers I put this on are pretty bad, I'm curious to see if the performance has been improved in any way. But I can't really be bothered to do any load testing now.

Overall, Kubernetes gets a K8/10.
