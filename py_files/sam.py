import requests as req
import sys
url = "https://finance.naver.com/sise/sise_market_sum.naver"
web = req.get(url)
html = web.text

# 인자 받기
args = sys.argv  

# 출력함수 만들기
def sam(jong):
    f1 = html.find(jong)        
    return(f'{jong}: ' + html[f1:f1 + 100][19:50].replace('td class="number">',"").replace('</td>',"").replace('\n',"")+"원")
    
if __name__ == '__main__':
    print(args[1])
    print(sam(args[1]))