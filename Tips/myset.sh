#!/bin/bash

# 환경 변수 확인
if [ -z "$HADOOP_CONF_DIR" ]; then
  echo "ERROR: HADOOP_CONF_DIR 환경 변수가 설정되지 않았습니다."
  echo "HADOOP_CONF_DIR 환경 변수를 설정하고 다시 실행하세요."
  exit 1
fi

# 설정 파일 경로
HADOOP_ENV_SH="$HADOOP_CONF_DIR/hadoop-env.sh"
CORE_SITE_XML="$HADOOP_CONF_DIR/core-site.xml"
HDFS_SITE_XML="$HADOOP_CONF_DIR/hdfs-site.xml"
MAPRED_SITE_XML="$HADOOP_CONF_DIR/mapred-site.xml"
YARN_SITE_XML="$HADOOP_CONF_DIR/yarn-site.xml"
WORKERS="$HADOOP_CONF_DIR/workers"

# hadoop-env.sh 설정 추가
echo "Updating hadoop-env.sh..."
echo "export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64" >> "$HADOOP_ENV_SH"

# core-site.xml 생성 또는 기존 파일 대체
echo "Creating or replacing core-site.xml..."
cat > "$CORE_SITE_XML" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <property>
    <name>fs.defaultFS</name>
    <value>hdfs://namenode:9000</value>
  </property>
  <property>
    <name>hadoop.tmp.dir</name>
    <value>/data/hadoop/tmp</value>
  </property>
</configuration>
EOF

# hdfs-site.xml 생성 또는 기존 파일 대체
echo "Creating or replacing hdfs-site.xml..."
cat > "$HDFS_SITE_XML" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <property>
    <name>dfs.replication</name>
    <value>3</value>
  </property>
  <property>
    <name>dfs.namenode.name.dir</name>
    <value>file:///data/hadoop/dfs/name</value>
    <final>true</final>
  </property>
  <property>
    <name>dfs.datanode.data.dir</name>
    <value>file:///data/hadoop/dfs/data</value>
    <final>true</final>
  </property>
  <property>
    <name>dfs.permissions</name>
    <value>true</value>
  </property>
</configuration>
EOF

# mapred-site.xml 생성 또는 기존 파일 대체
echo "Creating or replacing mapred-site.xml..."
cat > "$MAPRED_SITE_XML" << EOF
<configuration>
  <property>
    <name>mapreduce.framework.name</name>
    <value>yarn</value>
  </property>
  <property>
    <name>mapred.local.dir</name>
    <value>/data/hadoop/hdfs/mapred</value>
  </property>
  <property>
    <name>mapred.system.dir</name>
    <value>/data/hadoop/hdfs/mapred</value>
  </property>
  <property>
    <name>yarn.app.mapreduce.am.env</name>
    <value>HADOOP_MAPRED_HOME=$HADOOP_HOME</value>
  </property>
  <property>
    <name>mapreduce.map.env</name>
    <value>HADOOP_MAPRED_HOME=$HADOOP_HOME</value>
  </property>
  <property>
    <name>mapreduce.reduce.env</name>
    <value>HADOOP_MAPRED_HOME=$HADOOP_HOME</value>
  </property>
</configuration>
EOF

# yarn-site.xml 생성 또는 기존 파일 대체
echo "Creating or replacing yarn-site.xml..."
cat > "$YARN_SITE_XML" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <property>
    <name>yarn.nodemanager.aux-services</name>
    <value>mapreduce_shuffle</value>
  </property>
  <property>
    <name>yarn.nodemanager.aux-services.mapreduce_shuffle.class</name>
    <value>org.apache.hadoop.mapred.ShuffleHandler</value>
  </property>
  <property>
    <name>yarn.resourcemanager.resource-tracker.address</name>
    <value>namenode:8025</value>
  </property>
  <property>
    <name>yarn.resourcemanager.scheduler.address</name>
    <value>namenode:8030</value>
  </property>
  <property>
    <name>yarn.resourcemanager.address</name>
    <value>namenode:8035</value>
  </property>
</configuration>
EOF

# workers 파일 생성 또는 기존 파일 대체
echo "Creating or replacing workers file..."
cat > "$WORKERS" << EOF
datanode1
datanode2
datanode3
EOF

echo "Hadoop configuration setup completed successfully!"

echo "copy ... datanode x 3"
scp /home/hadoop/hadoop-3.4.1/etc/hadoop/* hadoop@datanode1:/home/hadoop/hadoop-3.4.1/etc/hadoop/
scp /home/hadoop/hadoop-3.4.1/etc/hadoop/* hadoop@datanode2:/home/hadoop/hadoop-3.4.1/etc/hadoop/
scp /home/hadoop/hadoop-3.4.1/etc/hadoop/* hadoop@datanode3:/home/hadoop/hadoop-3.4.1/etc/hadoop/
echo "copy done"

echo "Format namenode"
hdfs namenode -format