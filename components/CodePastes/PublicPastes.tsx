import {
  Box,
  Heading,
  Link,
  UnorderedList,
  ListItem,
  Tag,
  Skeleton,
  SkeletonText,
  Stack,
  Text
} from '@chakra-ui/react';
import { PasteType } from 'types';
import NextLink from 'next/link';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import { zonedTimeToUtc } from 'date-fns-tz';

TimeAgo.addDefaultLocale(en);

interface Props {
  publicPastes: PasteType[];
}

const PublicPastes = ({ publicPastes }: Props) => {
  const timeAgo = new TimeAgo('en-US');
  return (
    <Box mt="20">
      <Heading
        as="h2"
        size="lg"
        _selection={{ backgroundColor: 'purple.700' }}
        fontFamily="Poppins"
      >
        🌐 Latest public pastes
      </Heading>
      <UnorderedList spacing="4" mt="4">
        {!publicPastes ? (
          <Stack>
            {[...Array(8)].map((v, i) => (
              <ListItem key={i} fontSize="lg">
                <Skeleton h="25px" />
              </ListItem>
            ))}
          </Stack>
        ) : (
          publicPastes.map(paste => (
            <ListItem key={paste.id} fontSize="lg">
              {paste.title ? (
                <Link as={NextLink} href={`/pastes/${paste.pasteId}`} passHref>
                  <Text as="a" _selection={{ backgroundColor: 'purple.700' }}>
                    {paste.title} -{' '}
                    <Tag variant="solid" colorScheme="purple">
                      {paste.language} |{' '}
                      {timeAgo.format(zonedTimeToUtc(paste.createdAt, 'gmt'))}
                    </Tag>
                  </Text>
                </Link>
              ) : (
                <Link as={NextLink} href={`/pastes/${paste.pasteId}`}>
                  <a>
                    Untitled -{' '}
                    <Tag variant="solid" colorScheme="purple">
                      {paste.language} |{' '}
                      {timeAgo.format(zonedTimeToUtc(paste.createdAt, 'gmt'))}
                    </Tag>
                  </a>
                </Link>
              )}
            </ListItem>
          ))
        )}
        {}
      </UnorderedList>
    </Box>
  );
};

export default PublicPastes;
