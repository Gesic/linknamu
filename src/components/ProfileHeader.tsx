type Props = {
  name: string;
  bio: string;
  imageUrl: string;
};

export default function ProfileHeader({ name, bio, imageUrl }: Props) {
  return (
    <header className="flex flex-col items-center text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt={`${name} 프로필 사진`}
        className="h-44 w-44 rounded-full object-cover ring-4 ring-white shadow-md sm:h-52 sm:w-52"
      />
      <h1 className="mt-6 text-2xl font-bold text-gray-900">{name}</h1>
      <p className="mt-2 text-base text-gray-600">{bio}</p>
    </header>
  );
}
