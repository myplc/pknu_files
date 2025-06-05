echo "hadoop 클러스터를 중지합니다."
/home/hadoop/hadoop-3.4.1/sbin/stop-all.sh && echo "스파크 시스템을 중지합니다." && /home/hadoop/spark/sbin/stop-all.sh