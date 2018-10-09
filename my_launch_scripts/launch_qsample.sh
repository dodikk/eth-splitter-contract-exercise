geth \
    --rpc --rpccorsdomain="*" \
    --datadir /home/adk/.ethereum/qsample \
    --rpcapi "admin,db,eth,debug,miner,net,shh,txpool,personal,web3" \
    --nodiscover \
    --networkid 63745 \
    --genesis /home/adk/Documents/quiark-genesis.json \
    --unlock 0
