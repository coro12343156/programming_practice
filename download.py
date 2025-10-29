import requests

filename = "sample.txt"
url = f"https://raw.githubusercontent.com/coro12343156/programming_practice/refs/heads/main/{filename}"
response = requests.get(url)

if response.status_code == 200:
    with open(filename, "wb") as f:
        f.write(response.content)
    print("✅ ダウンロード完了")
else:
    print(f"⚠️ エラー: {response.status_code}")
    print(response.content)

