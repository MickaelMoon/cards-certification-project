import { Box, Text } from "@chakra-ui/react";

export default function Footer() {
    return (
        <Box as="footer" display="flex" justifyContent="center" alignItems="center" padding="1rem" height="6rem">
            <Text>&copy; 2025 Your Company. All rights reserved.</Text>
        </Box>
    );
}