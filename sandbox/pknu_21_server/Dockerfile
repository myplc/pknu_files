FROM ubuntu:22.04

LABEL maintainer="PKNU_team version, YS plctohmi@gmail.com"

# 환경 변수
ENV DEBIAN_FRONTEND=noninteractive
ENV JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
ENV LANG=en_US.UTF-8 \
    LANGUAGE=en_US:en \
    LC_ALL=en_US.UTF-8

# 필수 패키지 설치 + 로케일 설정
RUN apt-get update -y && \
    apt-get install -y sudo passwd openssh-server locales wget nano net-tools iputils-ping openjdk-8-jdk python3-pip && \
    locale-gen en_US.UTF-8 && \
    update-locale LANG=en_US.UTF-8 LANGUAGE=en_US:en LC_ALL=en_US.UTF-8 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# SSH 설정
RUN mkdir -p /var/run/sshd && \
    echo 'PermitRootLogin no' >> /etc/ssh/sshd_config && \
    echo 'PasswordAuthentication yes' >> /etc/ssh/sshd_config

# 사용자 생성 및 .bashrc 설정
RUN groupadd pkuser && \
    useradd -m -d /home/pkuser -s /bin/bash -g pkuser -G sudo pkuser && \
    echo "pkuser:1234" | chpasswd && \
    mkdir -p /home/pkuser/.ssh && \
    echo 'export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64' > /home/pkuser/.bashrc && \
    echo 'export PS1="\[\033[01;32m\]\u@\h:\[\033[01;34m\]\w\[\033[00m\]$ "' >> /home/pkuser/.bashrc && \
    echo 'alias ls="ls --color=auto"' >> /home/pkuser/.bashrc && \
    echo 'export TERM=xterm-256color' >> /home/pkuser/.bashrc && \
    echo 'export PATH="$HOME/.local/bin:$PATH"' >> /home/pkuser/.bashrc && \
    chown pkuser:pkuser /home/pkuser/.bashrc

# 포트 개방
EXPOSE 22

# 컨테이너 실행 시 SSH 데몬 실행
CMD ["/bin/bash", "-c", "service ssh start && exec bash"]
