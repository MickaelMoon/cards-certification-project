import {Box, Text, Image, Button, AspectRatio} from "@chakra-ui/react";
import { Card } from "@chakra-ui/react"
import { Stack, Badge } from "@chakra-ui/react"

interface CardShowcaseProps {
    name: string;
    grade: bigint;
    imageUrl: string;
    amount: bigint;
}

export default function CardShowcase({ name, grade, imageUrl, amount }: CardShowcaseProps) {
    return (
        <Box>
            <Card.Root width="sm" height="600px" overflow="hidden">

                    <Image
                        src={imageUrl}
                        alt={name}
                        width="100%"
                        height="100%"
                        overflow="hidden"
                        objectFit="contain"
                    />

                <Card.Body gap="2">
                    <Card.Title>{name}</Card.Title>
                    <Card.Description>
                        Note: {grade.toString()}
                        <Stack as="span" direction="row" flexWrap="wrap" mt="2">
                            <Badge colorPalette="blue">VMAX</Badge>
                            <Badge colorPalette="purple">ALTERNATIVE</Badge>
                        </Stack>
                    </Card.Description>
                    <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                        Quantity du NFT: {amount.toString()}
                    </Text>
                </Card.Body>
                {/*<Card.Footer gap="2">*/}
                {/*    <Button variant="solid">Buy now</Button>*/}
                {/*    <Button variant="ghost">Details</Button>*/}
                {/*</Card.Footer>*/}
            </Card.Root>
        </Box>
    );
}