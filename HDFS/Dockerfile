# 베이스 이미지
FROM ubuntu:latest

# 메타데이터 추가
LABEL maintainer="YS plctohmi@gmail.com"

# 필요한 패키지 설치 및 APT 캐시 정리 ,사용자 hadoop 생성 및 설정
RUN apt-get update -y && \
    apt-get install -y sudo passwd openssh-server wget nano net-tools iputils-ping openjdk-8-jdk rsync && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*  && \    
    groupadd hadoop && \
    useradd -m -d /home/hadoop -s /bin/bash -g hadoop -G sudo hadoop && \
    echo "hadoop:1234" | chpasswd && \
    mkdir -p /home/hadoop/.ssh && \
    chown -R hadoop:hadoop /home/hadoop     

# 하둡 설치 디렉토리 생성 및 다운로드, 로컬 폴더 생성, 환경 변수 설정, SSH 데몬 설정
RUN mkdir -p /home/hadoop && \
    wget https://archive.apache.org/dist/hadoop/common/hadoop-3.4.1/hadoop-3.4.1.tar.gz -P /home/hadoop && \
    tar -xvzf /home/hadoop/hadoop-3.4.1.tar.gz -C /home/hadoop && \
    rm /home/hadoop/hadoop-3.4.1.tar.gz && \
    chown -R hadoop:hadoop /home/hadoop/hadoop-3.4.1  && \
    mkdir -p /data/hadoop/tmp && \
    mkdir -p /data/hadoop/dfs/name && \
    mkdir -p /data/hadoop/dfs/data && \
    chown -R hadoop:hadoop /data/hadoop && \
    chmod -R 777 /data/hadoop && \
    echo "export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64" >> /etc/profile.d/hadoop_env.sh && \
    echo "export HADOOP_HOME=/home/hadoop/hadoop-3.4.1" >> /etc/profile.d/hadoop_env.sh && \
    echo "export HADOOP_CONF_DIR=\$HADOOP_HOME/etc/hadoop" >> /etc/profile.d/hadoop_env.sh && \
    echo "export PATH=\$PATH:\$JAVA_HOME/bin:\$HADOOP_HOME/bin:\$HADOOP_HOME/sbin" >> /etc/profile.d/hadoop_env.sh && \
    chmod +x /etc/profile.d/hadoop_env.sh && \
    chown hadoop:hadoop /home/hadoop/.bashrc && \
    mkdir -p /var/run/sshd && \
    echo 'PermitRootLogin no' >> /etc/ssh/sshd_config && \
    echo 'PasswordAuthentication yes' >> /etc/ssh/sshd_config

# SSH 포트 열기
EXPOSE 22

# SSH 서버 실행
CMD ["/bin/bash", "-c", "service ssh start && exec /bin/bash"]