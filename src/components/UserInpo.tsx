import Link from 'next/link';

const UserInpo = () => {
    return (
        <div className="flex items-center gap-2">
          {/* Sign In */}
          <Link href="/signIn">
            <button className="btn btn-sm md:btn-md rounded-lg border border-gray-300 bg-white px-4 text-gray-700 hover:bg-gray-100 hover:text-black transition-colors">
              সাইন ইন
            </button>
          </Link>

          {/* Sign Up */}
          <Link href="/signUp">
            <button className="btn btn-sm md:btn-md rounded-lg bg-green-600 px-4 text-white border-none hover:bg-green-700 transition-colors">
              সাইন আপ
            </button>
          </Link>
        </div>
    );
};

export default UserInpo;