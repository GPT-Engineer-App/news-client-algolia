import { useEffect, useState } from "react";
import { Container, Text, VStack, Spinner, Box, Link, Heading } from "@chakra-ui/react";
import axios from "axios";

const Index = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopStories = async () => {
      try {
        const response = await axios.get("https://hn.algolia.com/api/v1/search?tags=front_page");
        setStories(response.data.hits.slice(0, 15));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching top stories:", error);
        setLoading(false);
      }
    };

    fetchTopStories();
  }, []);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Heading as="h1" size="xl" mb={6}>Top 15 Hacker News Stories</Heading>
        {loading ? (
          <Spinner size="xl" />
        ) : (
          stories.map((story) => (
            <Box key={story.objectID} p={4} borderWidth="1px" borderRadius="md" width="100%">
              <Link href={story.url} isExternal>
                <Text fontSize="lg" fontWeight="bold">{story.title}</Text>
              </Link>
              <Text fontSize="sm" color="gray.500">by {story.author}</Text>
            </Box>
          ))
        )}
      </VStack>
    </Container>
  );
};

export default Index;