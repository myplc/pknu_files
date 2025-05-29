# openjdk 기반이미지 slim 버전사용
FROM openjdk:17-jdk-slim

# 필수 패키지 설치 maven
RUN apt update && apt install -y nano maven && rm -rf /var/lib/apt/lists/*

# 작업폴더 이름변경 가능
WORKDIR /workspace