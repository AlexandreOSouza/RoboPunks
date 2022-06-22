import { Box, Button, Flex, Image, Link, Spacer } from '@chakra-ui/react';
import Facebook from "../../assets/social-media-icons/facebook_32x32.png";
import Twitter from "../../assets/social-media-icons/twitter_32x32.png";
import Email from "../../assets/social-media-icons/email_32x32.png";
import { useWallet } from '../../hooks/useWallet';
import { useEffect } from 'react';

const NavBar = () => {
    const { connect, address } = useWallet();

    async function connectAccount() {
        connect();
    }

    return (
        <Flex justify={'space-between'} align={'center'} padding={'30px'}> 
            <Flex justify={'space-around'} width={'40%'} padding={'0 20px'}>
                <Link href={'https://www.facebook.com/roboPunks'}>
                    <Image src={Facebook} alt={'Facebook'} boxSize={"42px"} />
                </Link>
                <Link href={'https://www.facebook.com/roboPunks'}>
                    <Image src={Twitter} alt={'Twitter'} boxSize={"42px"} />
                </Link>
                <Link href={'https://www.facebook.com/roboPunks'}>
                    <Image src={Email} alt={'Email'} boxSize={"42px"} />
                </Link>
            </Flex>

            <Flex
                justify={'space-around'}
                align={'center'}
                width={'40%'}
                padding={'30px'}
            >
                <Box margin={'0 15px'}>About</Box>
                <Spacer />
                <Box margin={'0 15px'}>Mint</Box>
                <Spacer />
                <Box margin={'0 15px'}>Team</Box>
                <Spacer />
                {address ? (
                    <Box margin={'0 15px'}>Connected</Box>
                ) : (
                    <Button
                        backgroundColor={'#D6517D'}
                        borderRadius={'5px'}
                        boxShadow={'0px 2px 2px 1px #0F0F0F'}
                        color={'#FFFFFF'}
                        cursor={'pointer'}
                        fontFamily={'inherit'}
                        padding={'15px'}
                        margin={'0 15px'}
                        onClick={connectAccount}>Connect</Button>
                )}
            </Flex>

            
        </Flex>
    )

}

export default NavBar;
