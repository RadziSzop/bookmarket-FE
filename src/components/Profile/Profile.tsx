import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";

const ProfileView = () => {
  const profile = useSelector((state: RootState) => state.profile.profile);
  console.log(profile?.profile.name);
  return (
    <div className="flex justify-center">
      {profile ? (
        <div className="p-64 h-full flex justify-center items-center flex-col w-4/5">
          <Card>
            <CardHeader>
              <CardTitle>
                <h1 className="text-4xl mb-5">Profil</h1>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-left w-full">
                <span className="font-bold">Imię:</span> <br />{" "}
                {profile.profile.name}
              </p>
              <p className="text-left w-full">
                <span className="font-bold">Email:</span> <br /> {profile.email}
              </p>
              <p className="text-left w-full mt-12">
                {" "}
                <span className="font-bold">Dodatkowe kontakty:</span>{" "}
              </p>
              {profile.profile?.extraContact?.map((contact) => {
                return (
                  <div className="flex justify-between self-start">
                    <p>{contact.socialName}</p>
                    <p className="cursor-no-drop">{contact.socialLink}</p>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      ) : (
        <div>
          <div>sie sypie nie</div>
        </div>
      )}
    </div>
  );
};

export default ProfileView;
