import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/textarea";

export default function CreateProblem() {
    return (
        <div className="flex justify-center">
            <div className="w-[1200px] flex flex-col gap-[30px]">
                <TextArea placeholder="hello" />
                <div className="flex gap-[20px]">
                    <Input placeholder="this is input" />
                    <Button>Subscrive</Button>
                </div>
            </div>
        </div>
    );
}
