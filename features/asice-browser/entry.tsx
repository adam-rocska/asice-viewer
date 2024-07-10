import {FC, FunctionComponent, SVGProps} from "react";
import {ZipArchive, ZipEntry} from "@shortercode/webzip";
import {Card, CardBody, CardFooter, CardSlots, SlotsToClasses} from "@nextui-org/react";
import Folder from "@/icons/folder.svg";
import Paper from "@/icons/paper.svg";


export type Props = {
  archive: ZipArchive;
  name: string;
  entry: ZipEntry;
  classNames?: SlotsToClasses<CardSlots>;
};

export default (({archive, entry, name, classNames}) => {
  const Icon: FC<SVGProps<SVGElement>> = archive.is_folder(name) ? Folder : Paper;

  return (
    <Card
      shadow="none"
      isPressable
      onPress={() => console.log("item pressed")}
      classNames={{
        ...classNames
      }}
    >
      <CardBody className="items-center">
        <Icon className="w-full h-auto object-center" />
      </CardBody>
      <CardFooter className="text-small justify-between truncate">
        {name}
      </CardFooter>
    </Card>
  );
}) satisfies FunctionComponent<Props>;