if [ $1 == "" ];  then
    echo "usage addFlash.sh (name)"
    exit
fi

IFS=
index="$(cat page.html)"
newEntry="<div class=\"gameButton\"><button onclick=\"openGame('$1')\"> <img src=\"../images/$1.jpg\"></button></div>\n            <!--Flash End-->"
index="${index/<!--Flash End-->/$newEntry}"
echo $index > page.html

touch $1.html
echo "<!DOCTYPE html>\n<html>\n<head>\n<title>$1</title>\n</head>\n<script>\nwindow.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-TJ17WT7PW9');\n</script>\n<body>\n<embed src=\"SWF/$1.swf\" width="800" height="800">\n<script src=\"Ruffle/ruffle.js\"></script>\n<h3>Right click for fullscreen</h3>\n</body>\n</html>" > $1.html