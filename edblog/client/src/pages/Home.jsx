import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts?limit=9');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto '>
        <h1 className='text-3xl font-bold lg:text-6xl'>Bloğumuza hoşgeldiniz!</h1>
        <p className='text-gray-500 text-xs sm:text-sm'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab dolore quod ratione suscipit 
          modi laboriosam, ullam, repellendus animi veritatis maxime rerum perferendis. Culpa
           consequuntur nemo neque omnis impedit sit, magnam possimus exercitationem minus, ipsa ex quidem hic similique debitis iusto, ipsam maxime.
        </p>
        <Link
          to='/search'
          className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'
        >
          Yazılarımızı görmek ister misiniz?
        </Link>
      </div>
      <div className='p-3 bg-gray-100 dark:bg-slate-700'>
        <CallToAction />
      </div>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Son Yazılar</h2>
            <div className='flex flex-wrap gap-4'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              Tüm yazılar...
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}