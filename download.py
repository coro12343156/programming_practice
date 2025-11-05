import requests, zipfile, io

url = "https://github.com/coro12343156/programming_practice/archive/refs/heads/main.zip"
response = requests.get(url)

with zipfile.ZipFile(io.BytesIO(response.content)) as z:
    z.extractall("files")


