'use client';
import { Button, Box, Text, Input, VStack, Fieldset } from "@chakra-ui/react";
import { useAccount, useConnect, useDisconnect, useWriteContract } from "wagmi";
import {
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "@/components/ui/menu";
import { Tooltip } from "@/components/ui/tooltip";
import { useForm, SubmitHandler } from "react-hook-form";
import { Field } from "@/components/ui/field"
import {contractAddress, abi_certifyCard} from "@/config/contract";
import {config} from "@/lib/wagmi";




// Définition du type pour les données du formulaire
interface CertifyCardFormData {
    ownerAddress: `0x${string}`;
    cardName: string;
    grade: number;
    imageUrl: string;
    quantity: number;
    attributes: [];
}

export default function WalletConnectionButtons() {
    const { address, isConnected } = useAccount();
    const { connect, connectors } = useConnect();
    const { disconnect } = useDisconnect();
    const { writeContractAsync } = useWriteContract({config})

    // Utilisation de React Hook Form avec le type dédié
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<CertifyCardFormData>();

    // Fonction de soumission du formulaire
    const onSubmit: SubmitHandler<CertifyCardFormData> = async (data) => {
        console.log("Données du formulaire :", data);
        // Ajoutez ici la logique pour certifier la carte
        try {
            const tx = await writeContractAsync({
                abi: abi_certifyCard,
                address: contractAddress,
                functionName: 'certifyCard',
                args: [
                    data.ownerAddress,
                    data.cardName,
                    BigInt(data.grade),
                    data.imageUrl,
                    BigInt(data.quantity),
                ],
            });
            console.log("Transaction envoyée :", tx);
        } catch (error) {
            console.error("Erreur lors de l'exécution de writeContract :", error);
        }
        reset();
    };

    return (
        <Box>
            {!isConnected ? (
                <Button colorScheme="blue" onClick={() => connect({ connector: connectors[0] })}>
                    Connecter le wallet
                </Button>
            ) : (
                <Box maxWidth="200px" display="flex" justifyContent="center" flexDirection="column">
                    <MenuRoot>
                        <MenuTrigger asChild>
                            <Button variant="outline" size="sm">Menu</Button>
                        </MenuTrigger>
                        <MenuContent>
                            <DialogRoot>
                                <DialogTrigger asChild>
                                    <MenuItem value="certify-card" closeOnSelect={false}>
                                        Certifier une carte
                                    </MenuItem>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Certifiez votre carte</DialogTitle>
                                    </DialogHeader>
                                    <DialogBody>
                                        {/* Le formulaire est encapsulé dans une Fieldset */}
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <Fieldset.Root size="lg" invalid={Object.keys(errors).length > 0}>
                                                <Fieldset.Content>
                                                    <VStack gap={4}>
                                                        <Field label="Adresse du propriétaire" errorText={errors.ownerAddress?.message} invalid={!!errors.ownerAddress}>
                                                            <Input
                                                                placeholder="0x..."
                                                                defaultValue={address}
                                                                {...register("ownerAddress", { required: "Ce champ est requis" })}
                                                            />
                                                        </Field>
                                                        <Field label="Nom de la carte" errorText={errors.cardName?.message} invalid={!!errors.cardName}>
                                                            <Input
                                                                placeholder="Nom de la carte"
                                                                {...register("cardName", { required: "Ce champ est requis" })}
                                                            />
                                                        </Field>
                                                        <Field label="Grade (1-10)" errorText={errors.grade?.message} invalid={!!errors.grade}>
                                                            <Input
                                                                type="number"
                                                                placeholder="Grade"
                                                                {...register("grade", {
                                                                    required: "Ce champ est requis",
                                                                    min: { value: 1, message: "Minimum 1" },
                                                                    max: { value: 10, message: "Maximum 10" }
                                                                })}
                                                            />
                                                        </Field>
                                                        <Field label="URL de l'image" errorText={errors.imageUrl?.message} invalid={!!errors.imageUrl}>
                                                            <Input
                                                                placeholder="https://..."
                                                                {...register("imageUrl", {
                                                                    required: "Ce champ est requis",
                                                                    pattern: {
                                                                        value: /^https?:\/\/.+$/,
                                                                        message: "URL invalide"
                                                                    }
                                                                })}
                                                            />
                                                        </Field>
                                                        <Field label="Quantité" errorText={errors.quantity?.message} invalid={!!errors.quantity}>
                                                            <Input
                                                                type="number"
                                                                placeholder="Quantité"
                                                                {...register("quantity", {
                                                                    required: "Ce champ est requis",
                                                                    min: { value: 1, message: "La quantité doit être au moins 1" }
                                                                })}
                                                            />
                                                        </Field>
                                                    </VStack>
                                                </Fieldset.Content>
                                                {Object.keys(errors).length > 0 && (
                                                    <Fieldset.ErrorText>
                                                        Certains champs sont invalides. Veuillez vérifier.
                                                    </Fieldset.ErrorText>
                                                )}
                                            </Fieldset.Root>
                                            <DialogFooter mt="4">
                                                <DialogActionTrigger asChild>
                                                    <Button variant="outline">Cancel</Button>
                                                </DialogActionTrigger>
                                                <Button colorScheme="blue" type="submit" loading={isSubmitting}>
                                                    Certifier la carte
                                                </Button>
                                            </DialogFooter>
                                        </form>
                                    </DialogBody>
                                    <DialogCloseTrigger />
                                </DialogContent>
                            </DialogRoot>
                            <MenuItem value="new-win">New Window</MenuItem>
                            <MenuItem color="fg.error" value="disconnect" onClick={() => disconnect?.()}>
                                Déconnecter le wallet
                            </MenuItem>
                        </MenuContent>
                    </MenuRoot>
                    <Tooltip showArrow content={address} openDelay={100} interactive>
                        <Text cursor="pointer" truncate>
                            Connecté avec : {address}
                        </Text>
                    </Tooltip>
                </Box>
            )}
        </Box>
    );
}
