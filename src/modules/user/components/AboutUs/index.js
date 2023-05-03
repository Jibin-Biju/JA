import {
    Container,
    Stack,
    Flex,
    Box,
    Heading,
    Text,
    Button,
    Image,
    SimpleGrid,
    Icon,
    Avatar,
    useColorModeValue
} from '@chakra-ui/react';
import { FcAssistant, FcDonate, FcInTransit } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';


function AboutUs() {
    const navigate = useNavigate()

    return (
        <div className={'TourPage'}>
            {/* landing section */}
            <Container maxW={'6xl'} >
                <Stack
                    align={'center'}
                    spacing={{ base: 8, md: 10 }}
                    py={{ base: 28, md: 28 }}
                    direction={{ base: 'column', md: 'row' }}>
                    <Stack flex={1} spacing={{ base: 5, md: 10 }}>
                        <Heading
                            lineHeight={1.1}
                            fontWeight={700}
                            fontSize={{ base: '4xl', sm: '4xl', lg: '4xl' }}>
                            <Text as={'span'} position={'relative'}>Hello</Text>
                            <br />
                        </Heading>
                        <Text color={'gray.500'} >
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...
                        </Text>
                        <Stack
                            spacing={{ base: 4, sm: 6 }}
                            direction={{ base: 'column', sm: 'row' }}
                        >
                            <Button
                                rounded={'full'}
                                size={'lg'}
                                fontWeight={'normal'}
                                px={6}
                                colorScheme={'red'}
                                bg={'var(--primary)'}
                                _hover={{ bg: 'black' }}
                                onClick={() => navigate(`/addquestion`)}
                            >
                                Get started
                            </Button>
                        </Stack>
                    </Stack>
                    <Flex
                        flex={1}
                        justify={'center'}
                        align={'center'}
                        position={'relative'}
                        w={'full'}>
                        <Box
                            position={'relative'}
                            height={'300px'}
                            rounded={'2xl'}
                            boxShadow={'2xl'}
                            width={'full'}
                            overflow={'hidden'}
                        >
                            <Image
                                alt={'Hero Image'}
                                fit={'cover'}
                                align={'center'}
                                w={'100%'}
                                h={'100%'}
                                src={"/images/community.jpg"}
                            />
                        </Box>
                    </Flex>
                </Stack>
            </Container>
            {/* featuers */}
            <Container maxW={'6xl'}>
                <SimpleGrid columns={{ base: 1, md: 3 }} mb="1.5rem" gap={"2rem"}>
                    <Box
                        bg={useColorModeValue('white', 'gray.800')}
                        boxShadow={'lg'}
                        rounded={'xl'}>
                        <Feature

                            icon={<Icon as={FcAssistant} w={10} h={10} />}
                            title={'Lifetime Support'}
                            text={
                                'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
                            }
                        />
                    </Box>
                    <Box bg={useColorModeValue('white', 'gray.800')}
                        boxShadow={'lg'}
                        rounded={'xl'}>
                        <Feature
                            icon={<Icon as={FcDonate} w={10} h={10} />}
                            title={'Unlimited Donations'}
                            text={
                                'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
                            }
                        />
                    </Box>
                    <Box bg={useColorModeValue('white', 'gray.800')}
                        boxShadow={'lg'}
                        rounded={'xl'}>
                        <Feature
                            icon={<Icon as={FcInTransit} w={10} h={10} />}
                            title={'Instant Delivery'}
                            text={
                                'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
                            }
                        />
                    </Box>
                </SimpleGrid>
               
            </Container>
            {/* developers */}
            <Container maxW={"6x1"}>
                <Box bg={useColorModeValue('gray.100', 'gray.700')}>
                    <Container maxW={'6xl'} py={16} as={Stack} spacing={12}>
                        <Stack spacing={0} align={'center'} >
                            <Heading color="var(--primary)">Our Team</Heading>
                            <Text color="var(--primary)">We have a wonderfull Team of FullStack Developers</Text>
                        </Stack>
                        <Stack
                            direction={{ base: 'column', md: 'row' }}
                            spacing={{ base: 10, md: 4, lg: 10 }}>
                            <Testimonial>
                                <TestimonialContent>
                                    <TestimonialHeading>CEO</TestimonialHeading>
                                    <TestimonialText>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor
                                        neque sed imperdiet nibh lectus feugiat nunc sem.
                                    </TestimonialText>
                                </TestimonialContent>
                                <TestimonialAvatar
                                    src={''}
                                    name={'Zoga'}
                                    title={'CEO at JustAsk!'}
                                />
                            </Testimonial>
                            <Testimonial>
                                <TestimonialContent>
                                    <TestimonialHeading>CEO</TestimonialHeading>
                                    <TestimonialText>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor
                                        neque sed imperdiet nibh lectus feugiat nunc sem.
                                    </TestimonialText>
                                </TestimonialContent>
                                <TestimonialAvatar
                                    src={''}
                                    name={'Alex'}
                                    title={'CEO at JustAsk!'}
                                />
                            </Testimonial>
                            <Testimonial>
                                <TestimonialContent>
                                    <TestimonialHeading>CEO</TestimonialHeading>
                                    <TestimonialText>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor
                                        neque sed imperdiet nibh lectus feugiat nunc sem.
                                    </TestimonialText>
                                </TestimonialContent>
                                <TestimonialAvatar
                                    src={''}
                                    name={'Jibin'}
                                    title={'CEO at JustAsk!'}
                                />
                            </Testimonial>
                        </Stack>
                    </Container>
                </Box>
            </Container>

        </div >
    )
}

export default AboutUs

// for icons box
const Feature = ({ title, text, icon }) => {
    return (
        <Stack background={"white"} rounded="2xl" p="5">
            <Flex
                w={16}
                h={16}
                align={'center'}
                justify={'center'}
                color={'white'}
                rounded={'full'}
                bg={'gray.100'}
                mb={1}>
                {icon}
            </Flex>
            <Text fontWeight={600}>{title}</Text>
            <Text color={'gray.600'}>{text}</Text>
        </Stack>
    );
};

// for developer section
const Testimonial = ({ children }) => {
    return <Box color="var(--primary)">{children}</Box>;
};

const TestimonialAvatar = ({ src, name, title, }) => {
    return (
        <Flex align={'center'} mt={8} direction={'column'}>
            <Avatar src={src} alt={name} mb={2} />
            <Stack spacing={-1} align={'center'}>
                <Text fontWeight={600}>{name}</Text>
                <Text fontSize={'sm'} color={useColorModeValue('gray.600', 'gray.400')}>
                    {title}
                </Text>
            </Stack>
        </Flex>
    );
};

const TestimonialContent = ({ children }) => {
    return (
        <Stack
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow={'lg'}
            p={8}
            rounded={'xl'}
            align={'center'}
            pos={'relative'}
            _after={{
                content: `""`,
                w: 0,
                h: 0,
                borderLeft: 'solid transparent',
                borderLeftWidth: 16,
                borderRight: 'solid transparent',
                borderRightWidth: 16,
                borderTop: 'solid',
                borderTopWidth: 16,
                borderTopColor: useColorModeValue('white', 'gray.800'),
                pos: 'absolute',
                bottom: '-16px',
                left: '50%',
                transform: 'translateX(-50%)',
            }}>
            {children}
        </Stack>
    );
};

const TestimonialHeading = ({ children }) => {
    return (
        <Heading as={'h3'} fontSize={'xl'} color="var(--primary)">
            {children}
        </Heading>
    );
};

const TestimonialText = ({ children }) => {
    return (
        <Text
            textAlign={'center'}
            color={useColorModeValue('gray.600', 'gray.400')}
            fontSize={'sm'}>
            {children}
        </Text>
    );
};



