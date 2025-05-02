import { ScrollArea } from "@/components/ui/scroll-area";
import { faker } from "@faker-js/faker";
import { CreateInfluencerDialog } from "./components/create-influencer-dialog";

export default function InfluencerPage() {
  return (
    <div>
      <ScrollArea>
        <CreateInfluencerDialog />
        {influencersData.map((item, idx) => (
          <div key={idx}>{item.name}</div>
        ))}
      </ScrollArea>
    </div>
  );
}

const influencersData = Array.from({ length: 10 }).map(() => ({
  name: faker.person.lastName(),
}));
