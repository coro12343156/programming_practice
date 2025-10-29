function rangeAll() {
    min = document.getElementById("min");
    max = document.getElementById("max");
    min.value = 1
    max.value = 1900
}

let trueAnswer = [];

function start() {
    min = document.getElementById("min");
    max = document.getElementById("max");
    if (min.value < 1) {
        alert("範囲のはじめを正しく入力して下さい！");
    } else if (max.value < min.value) {
        alert("範囲のおわりを正しく入力して下さい！");
    } else if (max.value > Object.keys(words).length) {
        alert("範囲の終わりは" + String(Object.keys(words).length) + "番までです！");
    } else if (max.value - min.value + 1 < 20) {
        alert("範囲は、単語が20個以上収まるように指定して下さい！")
    } else {

        //テスト画面表示
        testdiv = document.getElementById("test");
        testdiv.style.display = "block";

        //リセット
        trueAnswer = [];
        for (let i = 0; i < 20; i++) {
            document.getElementById(String(i + 1)).style.color = "#fff";
        }
        for (let i = 0; i < 15; i++) {
            document.getElementById(String(i + 1) + "a").checked = false;
            document.getElementById(String(i + 1) + "b").checked = false;
            document.getElementById(String(i + 1) + "c").checked = false;
            document.getElementById(String(i + 1) + "d").checked = false;
            document.getElementById(String(i + 1) + "a").nextElementSibling.style.color = "#fff";
            document.getElementById(String(i + 1) + "b").nextElementSibling.style.color = "#fff";
            document.getElementById(String(i + 1) + "c").nextElementSibling.style.color = "#fff";
            document.getElementById(String(i + 1) + "d").nextElementSibling.style.color = "#fff";
        }
        for (let i = 15; i < 20; i++) {
            document.getElementById(String(i + 1)).nextElementSibling.value = "";
            document.getElementById(String(i + 1)).nextElementSibling.nextElementSibling.innerHTML = "";
        }


        //範囲の中からランダムに単語抽出
        const wordskey = Object.keys(words);
        const kouho = wordskey.slice(Number(min.value) + 1, Number(max.value) + 1);
        let tangolist = []
        for (let i = 0; i < 20; i++) {
            let tempkey = kouho[Math.floor(Math.random() * kouho.length)]
            kouho.splice(kouho.indexOf(tempkey), 1)
            let temp = { [tempkey]: words[tempkey] };
            tangolist.push(temp);
        }
        console.log(tangolist);
        const forTrueAnswerDict = { 0: "a", 1: "b", 2: "c", 3: "d" };

        //日本語→英語
        for (let i = 0; i < 4; i++) {
            question = document.getElementById(String(i + 1));
            question.innerHTML = Object.values(tangolist[i])[0];
            let zerotothree = Math.floor(Math.random() * 4);
            let answers = [];
            for (let j = 0; j < 4; j++) {
                if (zerotothree == j) {
                    answers.push(Object.keys(tangolist[i])[0]);
                    trueAnswer.push(forTrueAnswerDict[j]);
                } else {
                    answers.push(wordskey[Math.floor(Math.random() * 1900)])
                }
            }
            let a = document.getElementById(String(i + 1) + "a");
            a.value, a.nextElementSibling.innerHTML = answers[0];
            let b = document.getElementById(String(i + 1) + "b");
            b.value, b.nextElementSibling.innerHTML = answers[1];
            let c = document.getElementById(String(i + 1) + "c");
            c.value, c.nextElementSibling.innerHTML = answers[2];
            let d = document.getElementById(String(i + 1) + "d");
            d.value, d.nextElementSibling.innerHTML = answers[3];
        }

        //英語→日本語
        for (let i = 4; i < 15; i++) {
            question = document.getElementById(String(i + 1));
            question.innerHTML = Object.keys(tangolist[i])[0];
            let zerotothree = Math.floor(Math.random() * 4);
            let answers = [];
            for (let j = 0; j < 4; j++) {
                if (zerotothree == j) {
                    answers.push(Object.values(tangolist[i])[0]);
                    trueAnswer.push(forTrueAnswerDict[j]);
                } else {
                    answers.push(words[wordskey[Math.floor(Math.random() * 1900)]])
                }
            }
            let a = document.getElementById(String(i + 1) + "a");
            a.nextElementSibling.innerHTML = answers[0];
            let b = document.getElementById(String(i + 1) + "b");
            b.nextElementSibling.innerHTML = answers[1];
            let c = document.getElementById(String(i + 1) + "c");
            c.nextElementSibling.innerHTML = answers[2];
            let d = document.getElementById(String(i + 1) + "d");
            d.nextElementSibling.innerHTML = answers[3];
        }

        //記述
        for (let i = 15; i < 20; i++) {
            question = document.getElementById(String(i + 1));
            question.innerHTML = Object.values(tangolist[i])[0];
            trueAnswer.push(Object.keys(tangolist[i])[0]);
        }
        console.log(trueAnswer);
    }
}

function check() {
    let score = 0;
    for (let i = 0; i < 15; i++) {
        let truth = document.getElementById(String(i + 1) + trueAnswer[i]);
        if (truth.checked) {
            score += 1;
            document.getElementById(String(i + 1)).style.color = "#7f7";
        } else {
            document.getElementById(String(i + 1)).style.color = "#f55";
        }
        truth.nextElementSibling.style.color = "#7f7";
    }
    for (let i = 15; i < 20; i++) {
        let kaitou = document.getElementById(String(i + 1)).nextElementSibling.value;
        if (kaitou == trueAnswer[i]) {
            score += 1;
            document.getElementById(String(i + 1)).style.color = "#7f7";
        } else {
            document.getElementById(String(i + 1)).style.color = "#f55";
            document.getElementById(String(i + 1)).nextElementSibling.nextElementSibling.innerHTML = trueAnswer[i];
        }
    }
    document.getElementById("result").innerHTML = ("20問中" + String(score) + "問正解しました！")
}