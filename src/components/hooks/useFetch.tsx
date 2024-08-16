import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase.js";

interface PostData {
  id: string;
  userId: string;
  created: number;
  // Other post properties you might have
}

interface UserData {
  // User properties excluding 'created'
  // Example:
  username: string;
  bio?: string;
  userImg?: string;
  // Other user properties
}

interface FetchedData extends PostData, Partial<UserData> {}

const useFetch = (collectionName: string) => {
  const [data, setData] = useState<FetchedData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getDatas = async () => {
      const postRef = query(
        collection(db, collectionName),
        orderBy("created", "desc")
      );

      const unsubscribe = onSnapshot(postRef, async (snapshot) => {
        const postData = await Promise.all(
          snapshot.docs.map(async (docs) => {
            const postItems = { ...docs.data(), id: docs.id } as PostData;
            const userRef = doc(db, "users", postItems?.userId);
            const getUser = await getDoc(userRef);

            if (getUser.exists()) {
              const { created, ...rest } = getUser.data() as UserData;
              return { ...postItems, ...rest };
            }
            return postItems;
          })
        );
        setData(postData);
        setLoading(false);
      });

      return () => unsubscribe();
    };

    getDatas();
  }, [collectionName]);

  return {
    data,
    loading,
  };
};

export default useFetch;
