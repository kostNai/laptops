'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { Button } from '../ui/button'
import EditUserDialog from '../editUserDialog/EditUserDialog'
import { getUser } from '@/lib/fetcher'
import { UserType } from '@/types'
import FileDialog from '../fileDialog/FileDialog'
import { Select } from '../ui/select'
import EditUserRole from '../editUserRole/EditUserRole'

type Props = {
    id: string
}

export default function AdminSingleUserCard({ id }: Props) {
    const user: UserType = getUser(id)?.user
    const [isAdmin, setIsAdmin] = useState<boolean | undefined>(false)

    return (
        user && (
            <div className="mt-32 max-sm:mt-8">
                <div className="mb-16 max-sm:mb-0">
                    {user?.img ? (
                        <div>
                            <div className="relative  w-[300px] h-[200px]  max-sm:relative max-sm:w-full max-sm:h-[200px]">
                                <Image src={user.img} fill alt="user image" />
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
                            <div className="border-[1px] border-solid border-gray-300 rounded-xl w-fit p-4 max-sm:relative max-sm:w-full max-sm:h-[200px]">
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
                <div className="max-sm:ml-4">
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
                    <EditUserRole
                        isAdmin={isAdmin!}
                        setIsAdmin={setIsAdmin}
                        user={user}
                    />
                </div>
            </div>
        )
    )
}
