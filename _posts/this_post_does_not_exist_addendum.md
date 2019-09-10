---
title: This Post Does Not Exist [Addendum]
category: development
date: 2019-09-01
thumbnail: transformer-addendum-thumb.png
tags: ml,gpt2,python
description:
---

When I first created this blog, I had exactly 39 ideas for posts and
unfortunately I haven't come up with any more ideas since then. So starting
tomorrow I will only be releasing posts that were created using a GPT-2
transformer model trained on my past posts. GPT-2 is the advanced version of a
transformer-based model that was trained to generates synthetic text samples
from a variety of user-prompts as input. For more info view OpenAI's [blog
post](https://openai.com/blog/better-language-models/). Today I will go
through the steps I took to train and create it.

The original version has 1.5GB parameters but the OpenAI team did not
released the pre-trained model due to their concerns about malicious
applications of the technology. Having said that, they did released a smaller
version which has 117MB parameters that can be retrained on custom text
dataset which we will be using instead.

## Setup

First we need to get our training data. You can use any kind of text data that
you can find as long as they are in English, so for me these were obviously my posts
which are [all in markdown][]. I removed all the markdown formatting first
because I just wanted to get plain text samples first before experimenting
with whether it could also create correct markdown using this script:

[all in markdown]: https://github.com/beanpuppy/blog.justinduch.com/tree/master/_articles

```python
#!/usr/bin/env python

import os
from bs4 import BeautifulSoup
from markdown import markdown

files = os.listdir('./_articles')

data = ''

for f in files:
    with open(os.path.join('./_articles/' + f), 'r') as f_:
        html = markdown(f_.read())

    text = BeautifulSoup(html, features="html.parser").findAll(text=True)

    # ignore first lines which are just metadata
    text = ''.join(text[2:])
    data += text + '\n\n<|endoftext|>\n'

with open('training.txt', 'w') as f_:
    f_.write(data)
```

This uses a markdown parser to convert it into HTML and then get all the text
with `BeautifulSoup`. I also combined all the data into one `txt` file and
delimited each post with `<|endoftext|>`.

Now we need to clone the GPT-2 [repository][] and setup the environment:

[repository]: https://github.com/nshepperd/gpt-2

```bash
git clone https://github.com/nshepperd/gpt-2
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt
```

You may also need to do some extra steps as it didn't work out of the box for
me.

* Install more packages:

```bash
pip install numpy tensorflow
```

* Fix module linking (optional):

Because the module linking is kinda messed up I will prepend all my python
commands with `PYTHONPATH='./src'` to add the `src` directory to the path. If
you don't want to do this and run everything manually you can move `encode.py`
and `decode.py` into the `src` directory and run everything from there.

Now we need to download the base model:

```bash
python download_model.py 117M
```

Move the training data you created at the start into the project and run the
following command.

```bash
PYTHONPATH='./src' python encode.py training.txt training.npz
```

Remember that you don't need to add `PYTHONPATH` if you're in the `src`
directory.

## Training

To start training use:

```bash
PYTHONPATH='./src' python train.py --dataset training.npz
```

You may start seeing lots of warnings from numpy and tensorflow, but you can
ignore them. After a while you should see output like this:

```bash
Loading dataset...
100%|██████████████████████████████████████████| 1/1 [00:00<00:00, 70.56it/s]
dataset has 43217 tokens
Training...
[1 | 21.85] loss=3.25 avg=3.25
[2 | 39.46] loss=3.41 avg=3.33
[3 | 55.75] loss=3.63 avg=3.43
[4 | 81.97] loss=3.04 avg=3.33
[5 | 105.26] loss=2.95 avg=3.25
[6 | 130.92] loss=3.26 avg=3.26
[7 | 150.76] loss=3.76 avg=3.33
[8 | 168.35] loss=3.04 avg=3.29
[9 | 186.66] loss=3.67 avg=3.34
[10 | 207.01] loss=3.18 avg=3.32
[11 | 225.60] loss=3.34 avg=3.32
```
We can decipher the output `[6 | 130.92] loss=3.26 avg=3.26` as follows:

* 6: Refers to the number of training step. Think of it as a counter that will
increase by 1 after each run.

* 130.92: Time elapsed since the start of training in seconds. You can use the
first step as reference to determine how long does it take to run one step.

* loss and avg: Both of them refers to the cross-entropy (log loss) and the
average loss. You can use this to determine the performance of your model. In
theory, as training steps increases, the loss should decrease until it
converge at certain value. The lower, the better.

You can stop training at any time with `Ctrl-c` and resume with the same
command.

By default, the model will be saved once every 1000 steps and a sample will be
generated once every 100 steps. After you have interrupted the process, a
checkpoint folder and samples folder will be generated for you. Inside each
folder, you can find another folder called `run1` (you can modify this via the
run_name argument). Samples will contain the example output from the model,
you can view it in any text editor to evaluate your model. The checkpoint
folder will contains the necessary data for you to resume your training in the
future. Each saved model will contain a post-fix according to the number of
steps ran.

I trained 900 steps over two days with an average loss of 0.45.

## Generate Samples

Copy the `checkpoints/run1` directory to the `models` directory, renaming it
if you want.

```bash
cp -rf checkpoints/run1 models/mymodel
```

Copy some other files from `models/117M`.

```bash
cp models/117M/encoder.json models/mymodel/
cp models/117M/hparams.json models/mymodel/
cp models/117M/vocab.bpe models/mymodel/
```

### Unconditional Samples

Unconditional samples are randomly generated without any user input. This is
what I'm going to use.

```bash
PYTHONPATH='./src' python src/generate_unconditional_samples.py --model-name mymodel
```

This will keep generating samples until you terminate it.
