
## export BZZKEY=0x811e3b050b53d65a26ffc2039fdb314e064d5adf
## swarm \
##    --bzzaccount $BZZKEY                             \
##    --datadir  /home/adk/.ethereum/net2048/          \
##    --keystore /home/adk/.ethereum/net2048/keystore/ \
##    --ens-api ""                                     \
##    --bzzport 5000



export BZZKEY=0ab7895a90f82e04c6e7f867360f97adee9e496c
# fb5219f652b36223743a06c8257abbb74d870cb4

## geth \
##    --datadir ./swarm_datadir1/   \
##    console

# geth \
#    --datadir ./swarm_datadir1/   \
#    --unlock $BZZKEY              \
#    --password swarm-password.txt

swarm \
    --bzzaccount $BZZKEY                  \
    --datadir  ./swarm_datadir1/          \
    --keystore ./swarm_datadir1/keystore/ \
    --ens-api ""                          \
    --bzzport 5000

##
## ens-api: By setting this to “” 
## swarm will not connect to your block chain 
## and run without it.
##
##
## https://medium.com/coinmonks/setting-up-a-multi-node-private-ethereum-swarm-network-without-a-blockchain-e3fd55873887
##
##
