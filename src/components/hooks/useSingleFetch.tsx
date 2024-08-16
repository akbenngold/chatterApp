import {
  collection,
  onSnapshot,
  query,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase.js";

interface FetchData {
  id: string;
  [key: string]: any; // Allows for additional properties of unknown shape
}

const useSingleFetch = (
  collectionName: string,
  id: string | undefined,
  subCol: string
) => {
  const [data, setData] = useState<FetchData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getSingleData = () => {
      if (id) {
        const postRef = query(collection(db, collectionName, id, subCol));
        onSnapshot(postRef, (snapshot: QuerySnapshot<DocumentData>) => {
          setData(
            snapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }))
          );
          setLoading(false);
        });
      }
    };
    getSingleData();
  }, [db, id, collectionName, subCol]);

  return {
    data,
    loading,
  };
};

export default useSingleFetch;
