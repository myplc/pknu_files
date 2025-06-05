import yaml

services = {}
for i in range(1, 22):
    name = f"pkuser{i:02d}"
    services[name] = {
        "image": "pkteam:1.3",
        "container_name": name,
        "hostname": f"PKDB{i:02d}",
        "command": 'bash -c "service ssh start && tail -f /dev/null"',
        "ports": [
            f"{220+i}:22",
            # f"{8888+i}:8888",
            f"{8010+(i-1)*10}-{8010+(i-1)*10+9}:{8010+(i-1)*10}-{8010+(i-1)*10+9}"
        ],
        "restart": "always",
        "volumes": [
            f"D:\\dockerdata\\pkteam\\pkuser{i:02d}:/home/pkuser/data",
        ]
    }

compose = {
    "services": services    
}

with open("docker-compose.yml", "w") as f:
    yaml.dump(compose, f, default_flow_style=False, allow_unicode=True)

print("준비된 조건으로 docker-compose.yml 파일 생성이 완료되었습니다.")
