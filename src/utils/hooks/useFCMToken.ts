import { useEffect, useState } from "react";
import { getMessaging, getToken } from "firebase/messaging";
import firebaseApp from "@/utils/firebase";
import { useSendFCM } from "@/app/(authenticated)/(startedWork)/homepage/api";
import { useGetUserDetail } from "@/app/(authenticated)/(startedWork)/api";
import { isClient } from "../detectUtils";

const useFcmToken = () => {
  const [token, setToken] = useState("");
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState("");

  const { mutate: sendFCM } = useSendFCM();
  const { data: user } = useGetUserDetail();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (isClient() && user && token !== "") {
      const savedToken = localStorage.getItem("fcmToken");
      if (!savedToken && savedToken !== token)
        sendFCM(
          { fcmToken: token, owner: user?.id },
          {
            onSuccess: () => {
              localStorage.setItem("fcToken", token);
            },
          },
        );
    }
  }, [token, user]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const retrieveToken = async () => {
      try {
        if (typeof window !== "undefined" && "serviceWorker" in navigator) {
          const messaging = getMessaging(firebaseApp);

          // Retrieve the notification permission status
          const permission = await Notification.requestPermission();
          setNotificationPermissionStatus(permission);

          // Check if permission is granted before retrieving the token
          if (permission === "granted") {
            const currentToken = await getToken(messaging, {
              vapidKey: process.env.NEXTAUTH_URL_VAPID_KEY,
            });
            if (currentToken) {
              setToken(currentToken);
              if (user) {
                sendFCM({ fcmToken: currentToken, owner: user?.id });
              }
            }
          }
        }
      } catch (error) {}
    };

    retrieveToken();
  }, []);

  return { fcmToken: token, notificationPermissionStatus };
};

export default useFcmToken;
