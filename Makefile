HASH := `git rev-parse --short HEAD`

IMAGE := docker.duch.me/jd/blog:latest

docker:
	@echo "\n~> building docker image"
	@yarn install
	@yarn build
	@docker build . -t $(IMAGE)


push: 
	@echo "\n~> push to registry"
	@docker push $(IMAGE)
