## geth --nodiscover --testnet       \
geth --datadir ~/.ethereum/net42  \
     --rpc --rpcport 8545 \
           --rpcaddr 0.0.0.0 \
           --rpccorsdomain "*" \
           --rpcapi "eth,net,web3" \
     --networkid 42                \
     --metrics                     \
     --nodiscover                  \
     console



## --nodiscover --testnet --dev
