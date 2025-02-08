#!/bin/bash
set -euo pipefail

# Fonction d'affichage d'erreur et sortie
error_exit() {
  echo "Erreur : $1" >&2
  exit 1
}

# Vérifier si le processus 'anvil' est déjà lancé (recherche dans toute la ligne de commande)
PID=$(pgrep -f anvil || true)

if [[ -n "$PID" ]]; then
  echo "Le processus 'anvil' est en cours (PID: $PID). Sauvegarde de l'état..."
  # Exécute la commande de dump et redirige la sortie vers anvil-state.txt
  cast rpc anvil_dumpState --rpc-url http://127.0.0.1:8545 | tee anvil-state.txt \
    || error_exit "Erreur lors de la sauvegarde de l'état."

  echo -e "\nArrêt de Anvil (PID: $PID)...\n"
  kill "$PID" || error_exit "Impossible de tuer le processus 'anvil' (PID: $PID)."
  # Optionnel : attendre que le processus se termine
  sleep 2
else
  echo "Aucun processus 'anvil' trouvé."
fi

# Lancer Anvil en arrière-plan avec nohup, redirigeant la sortie vers un fichier log
echo -e "\nLancement de Anvil...\n"
nohup anvil > anvil.log 2>&1 &
ANVIL_PID=$!
echo "Anvil lancé (PID: $ANVIL_PID)."

# Attendre quelques secondes pour s'assurer qu'Anvil est lancé
sleep 3

# Vérifier si le fichier d'état existe et n'est pas vide
if [[ -s anvil-state.txt ]]; then
  echo -e "\nChargement de l'état sauvegardé...\n"
  STATE=$(cat anvil-state.txt)
  cast rpc anvil_loadState "$STATE" --rpc-url http://127.0.0.1:8545 \
    || error_exit "Erreur lors du chargement de l'état sauvegardé."
  echo "L'état a été chargé avec succès."
else
  echo -e "\nAucun état sauvegardé trouvé ou fichier vide. Exécution des commandes de déploiement...\n"

  # Exécuter la première commande avec forge
  echo "Exécution de forge create..."
  forge create --rpc-url http://127.0.0.1:8545 \
    --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 \
    src/PokemonCertification.sol:PokemonCertification --broadcast \
    || error_exit "Erreur lors de l'exécution de forge create."
  echo "La première commande a été exécutée."

  # Exécuter la deuxième commande avec cast send
  echo "Exécution de cast send..."
  cast send 0x5FbDB2315678afecb367f032d93F642f64180aa3 \
    "certifyCard(address,string,uint256,string,uint256)" \
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 \
    "Noctali VMAX" 10 \
    "https://cccgrading.com/files/noctali-vmax-evolution-celeste-215-alternative-ccc-10_d3f61549adaa7290cb4e3859d88c4bee.jpeg" \
    1 --rpc-url http://127.0.0.1:8545 \
    --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 \
    || error_exit "Erreur lors de l'exécution de cast send."
  echo "La deuxième commande a été exécutée."
fi
