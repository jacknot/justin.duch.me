HASH := `git rev-parse --short HEAD`

IMAGE := beanpupper/blog:latest

docker:
	@echo "\n~> building docker image"
	@yarn install
	@yarn build
	@docker build . -t $(IMAGE)


push: 
	@echo "\n~> push to hub.docker.com"
	@docker push $(IMAGE)
