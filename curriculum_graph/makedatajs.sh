
echo "var json = "
cat ../data.json
echo ";"
echo "if (typeof exports !== \"undefined\")
  exports.json = json;"
