#!/bin/bash

# SPARK_HOME 사전 정의
export SPARK_HOME=/home/hadoop/spark
export HADOOP_HOME=/home/hadoop/hadoop-3.4.1

# Spark 설치 여부 확인
if [ ! -d "$SPARK_HOME" ]; then
  echo "[INFO] Spark 설치 시작..."
  wget https://dlcdn.apache.org/spark/spark-3.5.5/spark-3.5.5-bin-hadoop3.tgz
  tar -xvzf spark-3.5.5-bin-hadoop3.tgz
  mv spark-3.5.5-bin-hadoop3 spark
  rm -f spark-3.5.5-bin-hadoop3.tgz
else
  echo "[INFO] Spark는 이미 설치되어 있습니다."
fi

# .bashrc 환경변수 중복 방지 추가
grep -qxF "export SPARK_HOME=/home/hadoop/spark" ~/.bashrc || echo "export SPARK_HOME=/home/hadoop/spark" >> ~/.bashrc
grep -qxF "export PATH=\$SPARK_HOME/bin:\$SPARK_HOME/sbin:\$PATH" ~/.bashrc || echo "export PATH=\$SPARK_HOME/bin:\$SPARK_HOME/sbin:\$PATH" >> ~/.bashrc
grep -qxF "export HADOOP_CONF_DIR=\$HADOOP_HOME/etc/hadoop" ~/.bashrc || echo "export HADOOP_CONF_DIR=\$HADOOP_HOME/etc/hadoop" >> ~/.bashrc

# 현재 세션 적용
source ~/.bashrc

echo "======================================================================"
echo "[INFO] spark-env.sh 설정 중..."

# spark-env.sh 설정
cp $SPARK_HOME/conf/spark-env.sh.template $SPARK_HOME/conf/spark-env.sh

cat <<EOF >> $SPARK_HOME/conf/spark-env.sh
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
export SPARK_HOME=$SPARK_HOME
export HADOOP_HOME=$HADOOP_HOME
export HADOOP_CONF_DIR=\$HADOOP_HOME/etc/hadoop
export SPARK_WORKER_CORES=2
export SPARK_WORKER_MEMORY=2g
export SPARK_MASTER_PORT=7077
export SPARK_MASTER_WEBUI_PORT=8080
export SPARK_MASTER_HOST=datanode1
export YARN_CONF_DIR=\$HADOOP_HOME/etc/hadoop
EOF

echo "[INFO] spark-defaults.conf 설정 중..."

# spark-defaults.conf 설정
cp $SPARK_HOME/conf/spark-defaults.conf.template $SPARK_HOME/conf/spark-defaults.conf

cat <<EOF >> $SPARK_HOME/conf/spark-defaults.conf
spark.master                       yarn
spark.eventLog.enabled            true
spark.eventLog.dir                hdfs://namenode:9000/spark-logs
spark.history.provider            org.apache.spark.deploy.history.FsHistoryProvider
spark.history.fs.logDirectory     hdfs://namenode:9000/spark-logs
spark.history.fs.update.interval  10s
EOF

echo "[INFO] workers 설정 중..."

# workers 설정
cat <<EOF > $SPARK_HOME/conf/workers
datanode1
datanode2
datanode3
EOF

echo "[INFO] 설정 파일 datanode2, datanode3으로 전송 중..."

for NODE in datanode2 datanode3
do
  scp -r $SPARK_HOME hadoop@$NODE:/home/hadoop/
  scp ~/.bashrc hadoop@$NODE:/home/hadoop/
done

echo "======================================================================"
echo "[완료] Spark 설치 및 설정이 datanode2, datanode3에 반영되었습니다."
