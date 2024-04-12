import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MyBooks } from "@/components/YourBooks/MyBooks/MyBooks";
import { MyReservations } from "@/components/YourBooks/MyReservations/MyReservations";

export const YourBooks = () => {
  return (
    <Tabs
      defaultValue="myBooks"
      className="w-full flex justify-center items-center flex-col mt-4"
    >
      <TabsList>
        <TabsTrigger value="myBooks">Moje książki</TabsTrigger>
        <TabsTrigger value="myReservations">Moje rezerwacje</TabsTrigger>
      </TabsList>
      <TabsContent value="myBooks">
        <MyBooks />
      </TabsContent>
      <TabsContent value="myReservations">
        <MyReservations />
      </TabsContent>
    </Tabs>
  );
};
