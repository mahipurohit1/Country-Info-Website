import fetch from "isomorphic-unfetch";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import Neighbors from "../components/Neighbors";
import SiteConfig from "../site.config";

import { Center, Container } from "@chakra-ui/react";
import Search from "../components/Search";
import SearchFilterButtons from "../components/SearchFilterButtons";

function Home({ countries }) {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();
  const query = router.query;
  console.log(query.region);

  useEffect(() => {
    if (query !== undefined && query.region !== undefined) {
      setKeyword(query.region);
      router.push({
        query: { region: query.region },
      });
    }
  }, [query.region]);

  const includesCountries = countries.filter(function (country) {
    if (country.region) {
      return (
        country.region.toLowerCase().includes(keyword) ||
        country.name.toLowerCase().includes(keyword) ||
        country.nativeName.toLowerCase().includes(keyword)
      );
    } else {
      return (
        country.name.toLowerCase().includes(keyword) ||
        country.nativeName.toLowerCase().includes(keyword)
      );
    }
  });

  const onInputChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  function getRegion(e) {
    e.preventDefault();
    const dataRegion = e.target.getAttribute("data-region").toLowerCase();
    router.push({
      query: { region: dataRegion },
    });

    setKeyword(dataRegion);
  }

  return (
    <Layout>
      <Head>
        <title>{SiteConfig.title}</title>
      </Head>

      <Container maxW="container.lg">
        <Center
          p="80px 0 100px 0"
          fontSize="1.8em"
          // color={mode("gray.900", "gray.50")}
          color={"#1a035e"}
        >
          {SiteConfig.description}
        </Center>
      </Container>
      <Container
        maxW="container.lg"
        mt={{
          base: "-32px",
          sm: "-32px",
        }}
        p={{
          base: "0px 15px",
          sm: "0px 50px",
        }}
      >
        <Search onChange={onInputChange} />
      </Container>
      <Container
        maxW="container.lg"
        p={{
          base: "0px 15px",
          sm: "0px 50px",
        }}
      >
        <SearchFilterButtons
          onClick={getRegion}
          length={includesCountries.length}
        />
      </Container>
      <Container
        maxW="container.lg"
        pt={{
          base: "30px",
          sm: "100px",
        }}
      >
        <Neighbors
          countries={includesCountries}
          test={includesCountries.length}
          keyword={keyword}
        />
        <Center as="small" mt="30px" color="gray.500">
          Found {includesCountries.length} countries
        </Center>
      </Container>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.com/v2/all/");
  const countries = await res.json();
  return {
    props: {
      countries,
    },
    revalidate: 6000,
  };
};

export default Home;
