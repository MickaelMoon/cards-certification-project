import { useState, useEffect } from "react";
import { Button, Box, Text, Input, VStack, Field } from "@chakra-ui/react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { DialogBody, DialogCloseTrigger, DialogContent, DialogHeader, DialogRoot, DialogTrigger } from "@/components/ui/dialog";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "@/components/ui/menu";
import { NumberInputField, NumberInputRoot } from "@/components/ui/number-input";
import { Tooltip } from "@/components/ui/tooltip";

export default function WalletConnectionButtons() {
    const { address, isConnected } = useAccount();
    const { connect, connectors } = useConnect();
    const { disconnect } = useDisconnect();

    const [isModalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        owner: address || "",
        name: "",
        grade: "",
        imageUrl: "",
        amount: ""
    });

    // 🔹 Fonction pour réinitialiser le formulaire
    const resetFormData = () => {
        setFormData({
            owner: address || "",
            name: "",
            grade: "",
            imageUrl: "",
            amount: ""
        });
    };

    // 🛠️ Réinitialiser les champs lorsque le modal s'ouvre
    useEffect(() => {
        if (isModalOpen) {
            resetFormData();
        }
    }, [isModalOpen]); // Exécuté chaque fois que `isModalOpen` change

    const handleChange = (field: keyof typeof formData, value: string | number) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        console.log("Données soumises :", formData);
        setModalOpen(false);
    };

    return (
        <Box>
            {!isConnected ? (
                <Button colorPalette="blue" onClick={() => connect({ connector: connectors[0] })}>
                    Connecter le wallet
                </Button>
            ) : (
                <Box maxWidth="200px" display="flex" justifyContent="center" flexDirection="column">
                    <MenuRoot>
                        <MenuTrigger asChild>
                            <Button variant="outline" size="sm">Menu</Button>
                        </MenuTrigger>
                        <MenuContent>
                            <MenuItem value="new-file" onClick={() => setModalOpen(true)}>Certifier une carte</MenuItem>
                            <MenuItem value="new-win">New Window</MenuItem>
                            <MenuItem color="fg.error" value="disconnect" onClick={() => disconnect?.()}>Déconnecter le wallet</MenuItem>
                        </MenuContent>
                    </MenuRoot>
                    <Tooltip showArrow content={address} openDelay={100} interactive>
                        <Text cursor="pointer" truncate>Connecté avec : {address}</Text>
                    </Tooltip>
                </Box>
            )}

            {/* Formulaire en modal */}
            <DialogRoot open={isModalOpen} onOpenChange={(details) => setModalOpen(details.open)}>
                <DialogTrigger />
                <DialogContent>
                    <DialogHeader>Certifier une carte</DialogHeader>
                    <DialogCloseTrigger asChild>
                        <Button position="absolute" top="10px" right="10px">✕</Button>
                    </DialogCloseTrigger>
                    <DialogBody>
                        <VStack gap={4}>
                            <Field.Root required>
                                <Field.Label>Adresse du propriétaire</Field.Label>
                                <Input 
                                    placeholder="0x..." 
                                    value={formData.owner} 
                                    onChange={(e) => handleChange("owner", e.target.value)} 
                                />
                            </Field.Root>

                            <Field.Root required>
                                <Field.Label>Nom de la carte</Field.Label>
                                <Input 
                                    placeholder="Nom de la carte" 
                                    value={formData.name} 
                                    onChange={(e) => handleChange("name", e.target.value)} 
                                />
                            </Field.Root>

                            <Field.Root required>
                                <Field.Label>Grade (1-10)</Field.Label>
                                <NumberInputRoot>
                                    <NumberInputField 
                                        value={formData.grade} 
                                        onChange={(e) => handleChange("grade", e.target.value)} 
                                    />
                                </NumberInputRoot>
                            </Field.Root>

                            <Field.Root required>
                                <Field.Label>URL de l'image</Field.Label>
                                <Input 
                                    placeholder="https://..." 
                                    value={formData.imageUrl} 
                                    onChange={(e) => handleChange("imageUrl", e.target.value)} 
                                />
                            </Field.Root>

                            <Field.Root required>
                                <Field.Label>Quantité</Field.Label>
                                <NumberInputRoot>
                                    <NumberInputField 
                                        value={formData.amount} 
                                        onChange={(e) => handleChange("amount", e.target.value)} 
                                    />
                                </NumberInputRoot>
                            </Field.Root>

                            <Button colorScheme="blue" width="full" onClick={handleSubmit}>
                                Certifier la carte
                            </Button>
                        </VStack>
                    </DialogBody>
                </DialogContent>
            </DialogRoot>
        </Box>
    );
}
