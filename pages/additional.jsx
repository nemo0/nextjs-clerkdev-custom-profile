import { useForm } from 'react-hook-form';
import { useUser } from '@clerk/nextjs/dist/client';

import { useRouter } from 'next/router';

const AdditionalUpdate = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { isLoaded, isSignedIn, user } = useUser();

  const onSubmit = (data) => {
    try {
      user.update({
        firstName: data.firstName,
        lastName: data.lastName,
        unsafeMetadata: {
          customName: data.customName,
          customBio: data.customBio,
        },
      });

      router.push('/view');
    } catch (error) {
      console.log(error);
    }
  };

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div className='mx-10'>
      <h1 className='text-2xl font-bold py-4'>Update Additional Information</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='firstName'
          >
            First Name
          </label>
          <input
            defaultValue={user.firstName}
            {...register('firstName', {
              required: true,
            })}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
          {errors.firstName && (
            <span className='text-sm text-red-600'>This field is required</span>
          )}
        </div>
        <div>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='lastName'
          >
            Last Name
          </label>
          <input
            defaultValue={user.lastName}
            {...register('lastName', {
              required: true,
            })}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
          {errors.lastName && (
            <span className='text-sm text-red-600'>This field is required</span>
          )}
        </div>
        <div>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='customName'
          >
            Custom Name
          </label>
          <input
            defaultValue={user.unsafeMetadata.customName}
            {...register('customName', {
              required: true,
            })}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
          {errors.customName && (
            <span className='text-sm text-red-600'>This field is required</span>
          )}
        </div>
        <div className='mt-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='customBio'
          >
            Custom Bio
          </label>
          <textarea
            rows={6}
            defaultValue={user.unsafeMetadata.customBio}
            {...register('customBio', {
              required: true,
            })}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          ></textarea>
          {errors.customBio && (
            <span className='text-sm text-red-600'>This field is required</span>
          )}
        </div>

        <button
          type='submit'
          className='bg-purple-500 px-8 py-2 my-4 text-lg font-semibold text-white hover:bg-purple-700 transition-all'
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default AdditionalUpdate;
