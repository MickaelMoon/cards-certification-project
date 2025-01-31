import { Box, Text, Image, Button } from "@chakra-ui/react";
import { Card } from "@chakra-ui/react"

interface CardShowcaseProps {
    name: string;
    grade: bigint;
    imageUrl: string;
}

export default function CardShowcase({ name, grade, imageUrl }: CardShowcaseProps) {
    return (
        <Box>
            <Card.Root maxW="sm" overflow="hidden">
                <Image
                    src={imageUrl}
                    alt={name}
                />
                <Card.Body gap="2">
                    <Card.Title>{name}</Card.Title>
                    <Card.Description>
                        Note: {grade.toString()}
                    </Card.Description>
                    <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                        $450
                    </Text>
                </Card.Body>
                <Card.Footer gap="2">
                    <Button variant="solid">Buy now</Button>
                    <Button variant="ghost">Details</Button>
                </Card.Footer>
            </Card.Root>
        </Box>
    );
}