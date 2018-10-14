#!/bin/bash

# TOKEN=SET_THROUGH_ENV
# curl -o search.json -X GET "https://www.hlidacstatu.cz/api/v1/search?query=*&page=1&order=1" -H "Authorization: Token $TOKEN"

array=(6432591 6432587 6432583 6432575 6432579 6432571 6432567 6432563 6432559 6432555 6432551 6432547 6432543 6432539 6432535)
for i in "${array[@]}"
do
  curl -o "contract-$i.json" -X GET "https://www.hlidacstatu.cz/api/v1/detail/$i?nice=1&json=1" -H "Authorization: Token $TOKEN"
done
