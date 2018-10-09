
#nice -n -50 \
geth --datadir ~/.ethereum/net2048 \
     --rpc --rpcport 8545          \
           --rpcaddr 127.0.0.1     \
           --rpccorsdomain "*"     \
           --rpcapi "db, eth,net,web3, personal" \
	--ws \
        --wsaddr "localhost" \
        --wsport "8555" \
        --wsorigins "*" \
     --networkid 2048              \
     --syncmode "fast"             \
     --metrics                     \
     --nodiscover                  \
     --verbosity 4                 \
     --mine                        \
     console


#geth --datadir ~/.ethereum/net2048 \
#     --rpc --rpcport 8545          \
#           --rpcaddr 127.0.0.1     \
#           --rpccorsdomain "*"     \
#           --rpcapi "eth,net,web3" \
#     --networkid 2048              \
#     --metrics                     \
#     --nodiscover                  \
#     --verbosity 4                 \
#     console



## --nodiscover --testnet --dev
