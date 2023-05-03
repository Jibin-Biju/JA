import {
    Box,
    chakra,
    Container,
    SimpleGrid,
    Stack,
    Text,
    VisuallyHidden,
    Input,
    IconButton,
    useColorModeValue,
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { BiMailSend } from 'react-icons/bi';
import Logo from '../../../../../common/Logo';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const SocialButton = ({
    children,
    label,
    href,
}) => {
    return (
        <chakra.button
            bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
            rounded={'full'}
            w={8}
            h={8}
            cursor={'pointer'}
            as={'a'}
            href={href}
            display={'inline-flex'}
            alignItems={'center'}
            justifyContent={'center'}
            transition={'background 0.3s ease'}
            _hover={{
                bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
            }}>
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </chakra.button>
    );
};

const ListHeader = ({ children }) => {
    return (
        <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
            {children}
        </Text>
    );
};

export default function LargeWithNewsletter() {
    const [email, setEmail] = useState('');

    const submitnewsletter = async (e) => {
        // newsletter logic
    }

    return (
        <Box
            className='px'
            bg={'var(--primary)'}
            color="white">
            <Container as={Stack} maxW="100%" py={10} px={0}>
                <SimpleGrid

                    templateColumns={{ md: '1fr', lg: '4fr  1fr 2fr' }}
                    spacing={8}>
                    <Stack spacing={6} maxW={'96%'}>
                        <Box>
                            <Logo />
                        </Box>
                        <Text fontSize={'sm'}>
                        JustAsk! is a social question-and-answer website. Our mission is to share and grow the world’s knowledge. Users can collaborate by editing questions and commenting on answers that have been.
                        </Text>
                        <Stack direction={'row'} spacing={6}>
                            <SocialButton label={'Twitter'} href={'#'}>
                                <FaTwitter />
                            </SocialButton>
                            <SocialButton label={'YouTube'} href={'#'}>
                                <FaYoutube />
                            </SocialButton>
                            <SocialButton label={'Instagram'} href={'#'}>
                                <FaInstagram />
                            </SocialButton>
                        </Stack>
                    </Stack>
                    <Stack align={'flex-start'}>
                        <ListHeader>Quick Links</ListHeader>
                        <Link to={"/home"}>Home</Link>
                        <Link to={"/about"}>About us</Link>
                        <Link to={"/addquestion"}>Add Question</Link>
                        <Link to={"/chatroom"}>Chat Room</Link>
                        <Link to={"/contact"}>Contact us</Link>
                    </Stack>

                    <Stack align={'flex-start'}>
                        <ListHeader>Stay up to date</ListHeader>
                        <Stack direction={'row'} w="100%">
                            <Input
                                placeholder={'Your email address'}
                                bg={useColorModeValue('white')}
                                type="email"
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                border={0}
                                _focus={{
                                    bg: 'whiteAlpha.900',
                                    color: "black"
                                }}
                            />
                            <IconButton
                                onClick={submitnewsletter}
                                bg={'var(--red)'}
                                color={useColorModeValue('white', 'gray.800')}
                                _hover={{
                                    bg: 'var(--red)'
                                }}
                                aria-label="Subscribe"
                                icon={<BiMailSend />}
                            />
                        </Stack>
                    </Stack>
                </SimpleGrid>
            </Container>
        </Box>
    );
}