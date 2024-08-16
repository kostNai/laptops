'use client'

import Image from 'next/image'
import React from 'react'
import { FaUser } from 'react-icons/fa'
import { Button } from '../ui/button'
import EditUserDialog from '../editUserDialog/EditUserDialog'
import { getUser } from '@/lib/fetcher'
import { UserType } from '@/types'
import { Select } from '../ui/select'
import { Input } from '../ui/input'
import FileDialog from '../fileDialog/FileDialog'

type Props = {
    id: string
}

export default function AdminSingleUserCard({ id }: Props) {
    const user: UserType = getUser(id)?.user

    return (
        user && (
            <div className="mt-32">
                <div className="mb-16 ">
                    {user?.img ? (
                        <div>
                            <div className="border-[1px] border-solid border-gray-300 rounded-xl w-fit p-4">
                                <Image
                                    src={user.img}
                                    width={200}
                                    height={300}
                                    alt="user image"
                                />
                            </div>
                            <FileDialog
                                title={'Фото профілю'}
                                propName={'user_img'}
                                defaultValue={''}
                                user={user}
                            />
                            <Select />
                        </div>
                    ) : (
                        <div>
                            <div className="border-[1px] border-solid border-gray-300 rounded-xl w-fit p-4">
                                <FaUser size={200} color="gray" />
                            </div>
                            <FileDialog
                                title={'Фото профілю'}
                                propName={'user_img'}
                                defaultValue={''}
                                user={user}
                            />
                            <Button
                                variant="link"
                                className="text-link-hover-color"
                            >
                                Додати
                            </Button>
                        </div>
                    )}
                </div>
                {user?.name ? (
                    <div className="flex gap-8 items-center">
                        <p>Ім'я - {user?.name}</p>
                        <EditUserDialog
                            title={"Ім'я"}
                            propName={'name'}
                            defaultValue={user.name}
                            user={user}
                        />
                    </div>
                ) : (
                    <div className="flex gap-8 items-center">
                        <p>Ім'я відсутнє</p>
                        <EditUserDialog
                            title={"Ім'я"}
                            propName={'name'}
                            defaultValue={user?.name!}
                            user={user!}
                        />
                    </div>
                )}
                <div className="flex gap-8 items-center">
                    <p>Логін - {user?.username}</p>
                    <EditUserDialog
                        title={'Логін'}
                        propName={'username'}
                        defaultValue={user?.username!}
                        user={user!}
                    />
                </div>
                <div className="flex gap-8 items-center">
                    <p>Email - {user?.email}</p>
                    <EditUserDialog
                        title={'Email'}
                        propName={'email'}
                        defaultValue={user?.email!}
                        user={user!}
                    />
                </div>
            </div>
        )
    )
}
