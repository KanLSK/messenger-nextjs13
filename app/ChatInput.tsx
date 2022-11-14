"use client";

import { useState } from "react";
import { v4 as uuid } from 'uuid';
import { Message } from '../typings';
import { unstable_getServerSession } from 'next-auth/next';
import fetcher from '../utils/fetchMessages';
import useSWR from 'swr';

type Props = {
  session: Awaited<ReturnType<typeof unstable_getServerSession>>
}

const ChatInput = ({ session }: Props) => {
  const [input, setInput] = useState("");
 
  const { data: messages, error, mutate } = useSWR("/api/getMessages", fetcher);

  const addMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input || !session) return;

    const messageToSend = input

    setInput('');

    const id = uuid();

    const message: Message = {
        id,
        message: messageToSend,
        created_at: Date.now(),
        username: session?.user?.name!,
        profilePic: session?.user?.image!,
        email: session?.user?.email!,
    }

    const uploadMessageToUpStash = async () => {
        const data = await fetch('/api/addMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message
            }),
        }).then((res) => res.json());

        return [ data.message, ...messages!];
    }

    await mutate(uploadMessageToUpStash, {
      optimisticData: [message, ...messages!],
      rollbackOnError: true,
    });
  };

  return (
    <form onSubmit={addMessage} className="fixed bottom-0 z-50 flex w-full space-x-2 border-t border-gray-100 px-10 py-5 bg-white">
      <input
        type="text"
        disabled={!session}
        value={input}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInput(e.target.value)
        }
        placeholder="Enter message here..."
        className="flex-1 rounded border border-gray-300 px-5 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
      />
      <button
        disabled={!input  }
        type="submit"
        className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;
