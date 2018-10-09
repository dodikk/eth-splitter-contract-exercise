
## export BZZKEY=0x811e3b050b53d65a26ffc2039fdb314e064d5adf
## swarm \
##    --bzzaccount $BZZKEY                             \
##    --datadir  /home/adk/.ethereum/net2048/          \
##    --keystore /home/adk/.ethereum/net2048/keystore/ \
##    --ens-api ""                                     \
##    --bzzport 5000



export BZZKEY=60bf5bbfbc3b141e710cc35f4e6ec0b22b0af0e1

swarm \
    --bzzaccount $BZZKEY                  \
    --datadir  ./swarm_datadir2/          \
    --keystore ./swarm_datadir2/keystore/ \
    --ens-api ""                          \
    --bzzport 5500                        \
    --port    9000


##
## ens-api: By setting this to “” 
## swarm will not connect to your block chain 
## and run without it.
##
##
## https://medium.com/coinmonks/setting-up-a-multi-node-private-ethereum-swarm-network-without-a-blockchain-e3fd55873887
##
##
