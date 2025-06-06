if [ $1 == "" ] || [ $2 == "" ];  then
    echo "usage addRom.sh (name) (gameCore) (category optional)"
    exit
fi

IFS=
if [ "$#" != "3" ]; then
index="$(cat index.html)"
newEntry="<div class=\"gameButton\"><button onclick=\"openGame('$1')\"> <img src=\"images/$1.jpg\"></button></div>\n            <!--Rom End-->"
index="${index/<!--Rom End-->/$newEntry}"
echo $index > index.html

touch $1.html
echo "<html>\n<head>\n<!--HTML file auto generated using EmulatorJS codehelper-->\n<style>\nbody, html {\nmargin: 0;\npadding: 0;\n}\n</style>\n<title>\n$1\n</title>\n</head>\n<!-- Google tag (gtag.js) -->\n<script async src=\"https://www.googletagmanager.com/gtag/js?id=G-TJ17WT7PW9\"></script>\n<script>\nwindow.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-TJ17WT7PW9');\n</script>\n<body>\n<div style=\"width:100%;height:100%;max-width:100%\">\n<div id=\"game\"></div>\n</div>\n<script>\nEJS_player = \"#game\";\nEJS_core = \"$2\";\nEJS_gameName = \"$1\";\nEJS_color = \"#0064ff\";\nEJS_startOnLoaded = true;\nEJS_pathtodata = \"https://cdn.emulatorjs.org/stable/data/\";\nEJS_gameUrl = \"games/$1.zip\";\n</script>\n<script src=\"https://cdn.emulatorjs.org/stable/data/loader.js\"></script>\n</body>\n</html>" > $1.html
else
index="$(cat $3/page.html)"
newEntry="<div class=\"gameButton\"><button onclick=\"openGame('$1')\"> <img src=\"../images/$1.jpg\"></button></div>\n        <!--Rom End-->"
index="${index/<!--Rom End-->/$newEntry}"
echo $index > $3/page.html

touch $3/$1.html
echo "<html>\n<head>\n<!--HTML file auto generated using EmulatorJS codehelper-->\n<style>\nbody, html {\nmargin: 0;\npadding: 0;\n}\n</style>\n<title>\n$1\n</title>\n</head>\n<!-- Google tag (gtag.js) -->\n<script async src=\"https://www.googletagmanager.com/gtag/js?id=G-TJ17WT7PW9\"></script>\n<script>\nwindow.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-TJ17WT7PW9');\n</script>\n<body>\n<div style=\"width:100%;height:100%;max-width:100%\">\n<div id=\"game\"></div>\n</div>\n<script>\nEJS_player = \"#game\";\nEJS_core = \"$2\";\nEJS_gameName = \"$1\";\nEJS_color = \"#0064ff\";\nEJS_startOnLoaded = true;\nEJS_pathtodata = \"https://cdn.emulatorjs.org/stable/data/\";\nEJS_gameUrl = \"games/$1.zip\";\n</script>\n<script src=\"https://cdn.emulatorjs.org/stable/data/loader.js\"></script>\n</body>\n</html>" > $3/$1.html
fi