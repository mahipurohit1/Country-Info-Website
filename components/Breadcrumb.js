import { Breadcrumb, BreadcrumbItem } from "@chakra-ui/breadcrumb";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Link from "next/link";

function BreadCrumb(props) {
  return (
    <Breadcrumb
      color="whiteAlpha.600"
      spacing="5px"
      separator={<ChevronRightIcon color="whiteAlpha.600" />}
    >
      <BreadcrumbItem>
        <Link href="/">Home</Link>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <Link href="/">Country</Link>
      </BreadcrumbItem>

      <BreadcrumbItem isCurrentPage>
        <span>{props.name}</span>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}

export default BreadCrumb;
