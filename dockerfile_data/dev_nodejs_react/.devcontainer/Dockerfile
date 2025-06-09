# .devcontainer 하위에 Dockerfile

FROM node:latest

RUN apt update && \
       apt install -y nano && \
       rm -rf /var/lib/apt/lists/*

WORKDIR /workspace

# 명시적으로 외부 3000포트 쓰겠다는 의지
EXPOSE 3000
