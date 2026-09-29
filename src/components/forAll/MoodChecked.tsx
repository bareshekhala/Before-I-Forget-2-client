//in editing part for all components we want the current moods for each object to be checked in the checkbox in the editing Dialog
import { useEffect, useState } from "react";
import service from "@/services/service.index";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";

type Mood = {
  id: string;
  name: string;
};

type MoodCheckedProps = {
  moodValue: string[];
  handleMood: (moods: string[]) => void;
};

function MoodChecked({ moodValue, handleMood }: MoodCheckedProps) {
  const [moods, setMoods] = useState<Mood[]>([]);

  useEffect(() => {
    const getMoods = async () => {
      try {
        const response = await service.get("/moods");
        setMoods(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMoods()
  },[]);

 const toggleMood = (name: string, checked: boolean) => {
    handleMood(checked ? [...moodValue, name] : moodValue.filter((each) => each !== name));
  };

  return (
    <FieldSet>
      <FieldLegend variant="label">Moods</FieldLegend>
      <div className="flex flex-wrap gap-x-5 gap-y-3">
        {moods.map((mood) => (
          <Field key={mood.id} orientation="horizontal" className="w-auto">
            <Checkbox
              id={`mood-${mood.id}`}
              checked={moodValue.includes(mood.name)}
              onCheckedChange={(checked) => toggleMood(mood.name, checked)}
            />
            <FieldLabel htmlFor={`mood-${mood.id}`} className="font-normal">
              {mood.name}
            </FieldLabel>
          </Field>
        ))}
      </div>
    </FieldSet>
  );
}


export default MoodChecked;
